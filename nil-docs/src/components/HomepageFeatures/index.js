import clsx from 'clsx';
import styles from './styles.module.css';

const NilProductDescription = ({ text, Svg }) => {
  return (
    <div className={styles.containerNilproduct}>
      <Svg className={styles.productImage} role="img" />
      <p className="highlight-text">{text}</p>
    </div>
  );
};

const ProductsList =
  [
    {
      Svg: require('@site/static/img/productImages/zkLLVMImage.svg').default,
      description: (
        <>
          zkLLVM is a compiler from high-level programming languages into an input for provable computations protocols verifiable on EVM (and not only).
          <br></br><a href="https://github.com/nilfoundation/zkllvm.git">https://github.com/nilfoundation/zkllvm.git</a>
          <br></br>Documentation, references, and manuals for zkApplications/circuit developers.
        </>
      ),
    },
    {
      Svg: require('@site/static/img/productImages/crypto3Image.svg').default,
      description: (
        <>
          Crypto3 is a modern cryptography suite in C++17 built by cryptographers for cryptographers dedicated to making it easy to prototype and implement novel schemes and primitives out of ready-to-use modules such as ciphers (block, algebraic, fully-homomorphic), hashes, signatures, proof systems, VDFs, witness encryption and many other.
          <br></br><a href="https://github.com/nilfoundation/crypto3.git">https://github.com/nilfoundation/crypto3.git</a>
          <br></br>Documentation, references, and manuals for applied cryptographers and C++ developers.
        </>
      ),
    },
    {
      Svg: require('@site/static/img/productImages/proofMarketImage.svg').default,
      description: (
        <>
          Proof Market is a decentralized protocol for zkProof generation and monetization built on top of =nil; zkSharding.
          <br></br><a href="https://proof.market/">https://proof.market/</a>
          <br></br>Documentation, references, and manuals for proof generators and EVM application developers.
        </>
      ),
    },
    {
      Svg: require('@site/static/img/productImages/zkShardingImage.svg').default,
      description: (
        <>
          =nil; zkSharding is the first Ethereum zkRollup with sharding — an alternative to the current Ethereum scalability ecosystem.
          <br></br>The unique combination of zkRollup and sharding enables secure and parallel transaction execution across dedicated shards while maintaining Ethereum's economic security and providing application developers with full composability and transparent data access.
          <br></br><a href="https://nil.foundation/blog/post/nil_zkSharding">https://nil.foundation/blog/post/nil_zkSharding</a>
        </>
      ),
    },
  ]

function NilProduct({ Svg, description, }) {
  return (
    <div className={clsx('col col--6')}>
      <NilProductDescription text={description} Svg={Svg}>
      </NilProductDescription>
    </div>
  );
}

export default function HomepageNilProducts() {
  return (
    <section className='${styles.nilProducts} ${styles.centeredContainer}'>
      <div className='container'>
        <div className='row'>
          {ProductsList.slice(0, 2).map((props, idx) => (<NilProduct key={idx} {...props} />))}
        </div>
        <div className='row'>
          {ProductsList.slice(-2).map((props, idx) => (<NilProduct key={idx} {...props} />))}
        </div>
      </div>
    </section>
  );
}





