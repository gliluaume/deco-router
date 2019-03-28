import app from './app';

const port = 1280;
const server = app.listen(port, () => {
  // tslint:disable-next-line
  console.log('🍌 App is running at http://localhost:%d', port,
  );
  // tslint:disable-next-line
  console.log('🔫 Press CTRL-C to stop\n');
});

export default server;
