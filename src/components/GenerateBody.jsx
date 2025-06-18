import '/src/styles/GenerateBody.css'
import Header from './Header';
import Content from './Content';

export default function GenerateBody() {
  return (
    <div className="body-container">
      <Header />
      <Content />
    </div>
  );
}
