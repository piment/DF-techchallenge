import Header from './common/Header';

function Layout({ children }) {
  return (
    <div className='App'>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
