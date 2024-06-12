package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"
)

// Component represents an OpenRPC component.
type Component struct {
	Title       string               `json:"title"`
	Type        string               `json:"type"`
	Description string               `json:"description"`
	Properties  map[string]Component `json:"properties,omitempty"`
	Required    []string             `json:"required,omitempty"`
}

// Method represents an OpenRPC method.
type Method struct {
	Name        string        `json:"name"`
	Tags        []TagRef      `json:"tags"`
	Summary     string        `json:"summary"`
	Description string        `json:"description"`
	Params      []Param       `json:"params"`
	Errors      []interface{} `json:"errors"`
	Result      Result        `json:"result"`
	Examples    []interface{} `json:"examples"`
}

// TagRef represents a reference to a tag.
type TagRef struct {
	Ref string `json:"$ref"`
}

// Param represents a parameter in a method.
type Param struct {
	Name   string    `json:"name"`
	Schema SchemaRef `json:"schema"`
}

// SchemaRef represents a reference to a schema.
type SchemaRef struct {
	Ref string `json:"$ref"`
}

// Result represents the result of a method.
type Result struct {
	Name   string    `json:"name"`
	Schema SchemaRef `json:"schema"`
}

func main() {
	// Open the Go source file.
	file, err := os.Open("eth_api.go")
	if err != nil {
		fmt.Printf("failed to open file: %v\n", err)
		return
	}
	defer file.Close()

	components := make(map[string]Component)
	methods := []Method{}

	var currentComponent *Component
	var currentName string
	var inObjectComponent bool

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		// Match @component line
		compMatch := regexp.MustCompile(`^\s*\/\/@component\s+(\w+)\s+(\w+)\s+(\w+)\s+"([^"]+)"`).FindStringSubmatch(line)
		if len(compMatch) == 5 {
			name := compMatch[1]
			title := compMatch[2]
			typ := compMatch[3]
			description := compMatch[4]

			component := Component{
				Title:       title,
				Type:        typ,
				Description: description,
				Properties:  make(map[string]Component),
			}
			components[name] = component
			currentComponent = &component
			currentName = name

			// Check if it is an object component
			inObjectComponent = typ == "object"
			continue
		}

		// Match @componentprop line only if we are in an object component
		if inObjectComponent {
			propMatch := regexp.MustCompile(`^\s*\/\/@componentprop\s+(\w+)\s+(\w+)\s+(\w+)\s+(true|false)\s+"([^"]+)"`).FindStringSubmatch(line)
			if len(propMatch) == 6 {
				propName := propMatch[1]
				propTitle := propMatch[2]
				propType := propMatch[3]
				required := propMatch[4] == "true"
				propDescription := propMatch[5]

				if currentComponent != nil {
					property := Component{
						Title:       propTitle,
						Type:        propType,
						Description: propDescription,
					}
					currentComponent.Properties[propName] = property
					if required {
						currentComponent.Required = append(currentComponent.Required, propName)
					}
					components[currentName] = *currentComponent
				}
			} else {
				// If the line doesn't match @componentprop, we're done with this object component
				inObjectComponent = false
			}
		}

		// Match method documentation
		if strings.HasPrefix(line, "/*") {
			method := Method{
				Params:   []Param{},
				Errors:   []interface{}{},
				Examples: []interface{}{},
			}
			for scanner.Scan() {
				line = scanner.Text()
				line = strings.TrimSpace(line)

				// End of the method documentation
				if strings.HasSuffix(line, "*/") {
					break
				}

				// Match @name
				nameMatch := regexp.MustCompile(`@name\s+(\w+)`).FindStringSubmatch(line)
				if len(nameMatch) == 2 {
					method.Name = strings.Title(nameMatch[1])
				}

				// Match @summary
				summaryMatch := regexp.MustCompile(`@summary\s+(.+)`).FindStringSubmatch(line)
				if len(summaryMatch) == 2 {
					method.Summary = summaryMatch[1]
				}

				// Match @description
				descriptionMatch := regexp.MustCompile(`@description\s*(.*)`).FindStringSubmatch(line)
				if len(descriptionMatch) == 2 {
					method.Description = descriptionMatch[1]
				}

				// Match @tags
				tagsMatch := regexp.MustCompile(`@tags\s+\[(.+)\]`).FindStringSubmatch(line)
				if len(tagsMatch) == 2 {
					tagNames := strings.Split(tagsMatch[1], ",")
					for _, tagName := range tagNames {
						method.Tags = append(method.Tags, TagRef{
							Ref: fmt.Sprintf("#/components/tags/%s", strings.TrimSpace(tagName)),
						})
					}
				}

				// Match @param
				paramMatch := regexp.MustCompile(`@param\s+(\w+)\s+(\w+)`).FindStringSubmatch(line)
				if len(paramMatch) == 3 {
					param := Param{
						Name: paramMatch[1],
						Schema: SchemaRef{
							Ref: fmt.Sprintf("#/components/schemas/%s", strings.Title(paramMatch[2])),
						},
					}
					method.Params = append(method.Params, param)
				}

				// Match @returns
				returnsMatch := regexp.MustCompile(`@returns\s+(\w+)\s+(\w+)`).FindStringSubmatch(line)
				if len(returnsMatch) == 3 {
					method.Result = Result{
						Name: returnsMatch[1],
						Schema: SchemaRef{
							Ref: fmt.Sprintf("#/components/schemas/%s", strings.Title(returnsMatch[2])),
						},
					}
				}
			}
			methods = append(methods, method)
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Printf("failed to scan file: %v\n", err)
		return
	}

	// Write the methods and components to the OpenRPC spec file.
	openrpcSpec := map[string]interface{}{
		"openrpc": "1.2.4",
		"info": map[string]interface{}{
			"title": "JSON-RPC API",
			"version": "1.0.0",
			"description": "This section lists the JSON-RPC methods exposed by the =nil; RPC node.",
		},
		"methods": methods,
		"components": map[string]interface{}{
			"schemas": components,
			"tags": map[string]interface{}{
				"Accounts": map[string]interface{}{
					"name":        "Accounts",
					"description": "Methods for interacting with accounts.",
				},
				"Blocks": map[string]interface{}{
					"name":        "Blocks",
					"description": "Methods for interacting with blocks.",
				},
				"Filters": map[string]interface{}{
					"name":        "Filters",
					"description": "Methods for interacting with filters.",
				},
				"Messages": map[string]interface{}{
					"name":        "Messages",
					"description": "Methods for interacting with messages.",
				},
				"Receipts": map[string]interface{}{
					"name":        "Receipts",
					"description": "Methods for interacting with receipts.",
				},
				"Transactions": map[string]interface{}{
					"name":        "Transactions",
					"description": "Methods for interacting with transactions.",
				},
				"Calls": map[string]interface{}{
					"name": "Sending",
					"description": "Methods for calling messages.",
				},
				"Shards": map[string]interface{}{
					"name": "Shards",
					"description": "Methods for interacting with shards.",
				},
			},
		},
	}

	outputFile, err := os.Create("openrpc_auto.json")
	if err != nil {
		fmt.Printf("Failed to create output file: %v\n", err)
		return
	}
	defer outputFile.Close()

	encoder := json.NewEncoder(outputFile)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(openrpcSpec); err != nil {
		fmt.Printf("Failed to encode JSON: %v\n", err)
		return
	}

	fmt.Println("OpenRPC specification written to openrpc_auto.json")
}
