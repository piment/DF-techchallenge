import Header from './common/Header';

function Layout({ children }) {
  return (
    <div className='App'>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
