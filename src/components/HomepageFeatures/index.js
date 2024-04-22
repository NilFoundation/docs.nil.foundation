import styles from './styles.module.css';
import Crypto3 from '../../../static/img/productImages/Crypto3.png';
import zkLLVM from '../../../static/img/productImages/zkLLVM.png';
import ProofMarket from '../../../static/img/productImages/PM.png';
import zkSharding from '../../../static/img/productImages/zkSharding.png';


const ProductsList =
  [
    {
      image: zkLLVM,
      description: (
        <>
          <p>zkLLVM is a compiler from high-level programming languages into an input for provable computations protocols verifiable on EVM (and not only).</p>
          <p><a href="https://github.com/nilfoundation/zkllvm.git">https://github.com/nilfoundation/zkllvm.git</a></p>
          <p>Documentation, references, and manuals for zkApplications/circuit developers.</p>
        </>
      ),
    },
    {
      image: ProofMarket,
      description: (
        <>
          <p>Proof Market is a decentralized protocol for zkProof generation and monetization built on top of =nil; zkSharding.</p>
          <p><a href="https://proof.market/">https://proof.market/</a></p>
          <p>Documentation, references, and manuals for proof generators and EVM application developers.</p>
        </>
      ),
    },
    {
      image: zkSharding,
      description: (
        <>
          <p>=nil; zkSharding is the first Ethereum zkRollup with sharding — an alternative to the current Ethereum scalability ecosystem.</p>
          <p>The unique combination of zkRollup and sharding enables secure and parallel transaction execution across dedicated shards while maintaining Ethereum's economic security and providing application developers with full composability and transparent data access.</p>
          <p><a href="https://nil.foundation/blog/post/nil_zkSharding">https://nil.foundation/blog/post/nil_zkSharding</a></p>
        </>
      ),
    },
    {
      image: Crypto3,
      description: (
        <>
          <p>Crypto3 is a modern cryptography suite in C++17 built by cryptographers for cryptographers dedicated to making it easy to prototype and implement novel schemes and primitives out of ready-to-use modules such as ciphers (block, algebraic, fully-homomorphic), hashes, signatures, proof systems, VDFs, witness encryption and many other.</p>
          <p><a href="https://github.com/nilfoundation/crypto3.git">https://github.com/nilfoundation/crypto3.git</a></p>
          <p>Documentation, references, and manuals for applied cryptographers and C++ developers.</p>
        </>
      ),
    },


  ]



const NilProductDescription = ({ text, image, onDocsClick }) => {
  return (
    <div onClick={onDocsClick}>
      <img src={image} />
      <div className={styles.productDescription}>
        <p>{text}</p>
      </div>
    </div>
  );
};

function NilProduct({ image, description, onDocsClick }) {
  return (
    <div>
      <NilProductDescription text={description} image={image} onDocsClick={onDocsClick} />
    </div>
  );
}



export default function HomepageNilProducts() {
  const GoToDocs = (Url) => () => {
    window.open(Url, '_self');
  };
  return (
    <div className='container' id='productContainer'>
      <div className={'row' + ' ' + styles.rowFlex}>
        <div className='col col-6'>
          <div id='zkllvm-docs'>
            <NilProduct image={ProductsList[0].image} description={ProductsList[0].description} onDocsClick={GoToDocs("/zkllvm/overview/what-is-zkllvm")}></NilProduct>
          </div>
        </div>
        <div className='col col-6'>
          <div id='proof-market-docs'>
            <NilProduct image={ProductsList[1].image} description={ProductsList[1].description} onDocsClick={GoToDocs("/proof-market/intro")} ></NilProduct>
          </div>
        </div>
      </div>
      <div className={'row' + ' ' + styles.rowFlex}>
        <div className='col col-6'>
          <div id='zk-sharding-docs'>
            <NilProduct image={ProductsList[2].image} description={ProductsList[2].description} onDocsClick={GoToDocs("https://nil.foundation/blog/post/nil_zkSharding")}></NilProduct>
          </div>
        </div>
        <div className='col col-6'>
          <div id='crypto3-docs'>
            <NilProduct image={ProductsList[3].image} description={ProductsList[3].description} onDocsClick={GoToDocs("/crypto3/intro")}></NilProduct>
          </div>
        </div>
      </div>
    </div >
  );
}






