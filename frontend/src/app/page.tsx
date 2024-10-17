import Header from "./components/Header/Header";
import Card from "./components/Card/Card";


export default function Home() {
  return (

    <div >

      <Header />
      {/* <div
        style={{
          width: '805px',
          height: '67px',
          left: '258px',
          top: '179px',
          fontFamily: "'Asap', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '48px',
          lineHeight: '55px',
          textAlign: 'center',
          color: '#007AFF',
        }}
      >
        Visualize Your Code Like Never Before Transform your code into powerful visualizations for better understanding and debugging.
      </div> */}
      <Card label="Arrays" />
    </div>
  );
}
