export const rootConfiguration = async () => ({
  port: 1337,
  db: {
    mongodb: {
      url: process.env.MONGODB_URL ?? 'mongodb://localhost:27017/counterModsDev',
    },
  },
  minio: {
    region: 'us-east-1',
    endpoint: process.env.NODE_ENV === 'production' ? 'http://cm-minio:9000' : 'http://localhost:9000',
    credentials: {
      accessKeyId: process.env.MINIO_ACCESS_KEY_ID,
      secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY,
    },
  },
});
