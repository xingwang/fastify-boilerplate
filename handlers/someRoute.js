import { number, object } from 'yup';

export const someRouteSchemaOptions = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recursive: true,
};

export const someRouteBodySchema = object({
  name: number().required(),
});

export const someRouteHandler = async (req, res) => {
  const { user, query, body } = req;
  console.log(user, query, body);
  res.send({ hello: 'some world' });
};
