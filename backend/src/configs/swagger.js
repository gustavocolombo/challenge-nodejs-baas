export default{
  info: {
    title: 'challenge live on solutions',
    version: '0.0.1',
    description: 'API documentation'
  },
  swagger: '2.0',
  host: 'localhost:3000',
  apis: ['./src/routes/*.js'],
  basePath: '/api/',
}