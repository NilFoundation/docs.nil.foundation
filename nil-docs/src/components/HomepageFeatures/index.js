import clsx from 'clsx';
import styles from './styles.module.css';
import { useNavigate } from "react-router-dom";

const ProductsList =
  [
    {
      Svg: require('@site/static/img/productImages/zkLLVMImage.svg').default,
      description: (
        <>
          <p>zkLLVM is a compiler from high-level programming languages into an input for provable computations protocols verifiable on EVM (and not only).</p>
          <p><a href="https://github.com/nilfoundation/zkllvm.git">https://github.com/nilfoundation/zkllvm.git</a></p>
          <p>Documentation, references, and manuals for zkApplications/circuit developers.</p>
        </>
      ),
    },
    {
      Svg: require('@site/static/img/productImages/crypto3Image.svg').default,
      description: (
        <>
          <p>Crypto3 is a modern cryptography suite in C++17 built by cryptographers for cryptographers dedicated to making it easy to prototype and implement novel schemes and primitives out of ready-to-use modules such as ciphers (block, algebraic, fully-homomorphic), hashes, signatures, proof systems, VDFs, witness encryption and many other.</p>
          <p><a href="https://github.com/nilfoundation/crypto3.git">https://github.com/nilfoundation/crypto3.git</a></p>
          <p>Documentation, references, and manuals for applied cryptographers and C++ developers.</p>
        </>
      ),
    },
    {
      Svg: require('@site/static/img/productImages/proofMarketImage.svg').default,
      description: (
        <>
          <p>Proof Market is a decentralized protocol for zkProof generation and monetization built on top of =nil; zkSharding.</p>
          <p><a href="https://proof.market/">https://proof.market/</a></p>
          <p>Documentation, references, and manuals for proof generators and EVM application developers.</p>
        </>
      ),
    },
    {
      Svg: require('@site/static/img/productImages/zkShardingImage.svg').default,
      description: (
        <>
          <p>=nil; zkSharding is the first Ethereum zkRollup with sharding — an alternative to the current Ethereum scalability ecosystem.</p>
          <p>The unique combination of zkRollup and sharding enables secure and parallel transaction execution across dedicated shards while maintaining Ethereum's economic security and providing application developers with full composability and transparent data access.</p>
          <p><a href="https://nil.foundation/blog/post/nil_zkSharding">https://nil.foundation/blog/post/nil_zkSharding</a></p>
        </>
      ),
    },
  ]



const NilProductDescription = ({ text, Svg, onDocsClick }) => {
  return (
    <div onClick={onDocsClick}>
      <Svg className={styles.productImage} role="img" />
      <div className={styles.productDescription}>
        <p>{text}</p>
      </div>
    </div>
  );
};

function NilProduct({ Svg, description, onDocsClick }) {
  return (
    <div>
      <NilProductDescription text={description} Svg={Svg} onDocsClick={onDocsClick} />
    </div>
  );
}

export default function HomepageNilProducts() {
  const GoToDocs = (Url) => () => {
    window.open(Url, '_self');
  };
  return (
    <div class='container' id='productContainer'>
      <div class={'row' + ' ' + styles.rowFlex}>
        <div class='col col-6'>
          <div id='zkllvm-docs'>
            <NilProduct Svg={ProductsList[0].Svg} description={ProductsList[0].description} onDocsClick={GoToDocs("/zkllvm/intro")}></NilProduct>
          </div>
        </div>
        <div class='col col-6'>
          <div id='crypto3-docs'>
            <NilProduct Svg={ProductsList[1].Svg} description={ProductsList[1].description} onDocsClick={GoToDocs("/crypto3/intro")} ></NilProduct>
          </div>
        </div>
      </div>
      <div class={'row' + ' ' + styles.rowFlex}>
        <div class='col col-6'>
          <div id='proof-market-docs'>
            <NilProduct Svg={ProductsList[2].Svg} description={ProductsList[2].description} onDocsClick={GoToDocs("/proof-market/intro")}></NilProduct>
          </div>
        </div>
        <div class='col col-6'>
          <div id='zksharding-docs'>
            <NilProduct Svg={ProductsList[3].Svg} description={ProductsList[3].description} onDocsClick={GoToDocs("https://nil.foundation/blog/post/nil_zkSharding")}></NilProduct>
          </div>
        </div>
      </div>
    </div >
  );
}






