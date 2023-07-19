const z = require('zod');

const personVerification = (req, res, next) => {
  const Person = z.object({
    firstName: z.string({
      required_error: 'firstName required',
      invalid_type_error: 'firstName must be a string'
    }),
    lastName: z.string({
      required_error: 'lastName required',
      invalid_type_error: 'lastName must be a string'
    }),
    email: z.string({
      required_error: 'email required',
      invalid_type_error: 'email must be a string'
    }).email({ message: 'email must be a valid email' }),
    phone: z.string({
      required_error: 'phone is required',
    }).length(11, { message: 'phone must be exact 11 numbers' })
  });

  try {
    const verification = Person.parse(req.body);
    req.body = verification;
    next();
  } catch (err) {
    console.log(err);
    const message = err.issues
      .map(err => err.message).join(', ');
    return res.status(400).json({ message });
  }
};

module.exports = personVerification;