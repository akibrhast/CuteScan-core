const forms = require('forms');
const fields = forms.fields;
const validators = forms.validators;
 
const reg_form = forms.create({
    username: fields.string({ required: true }),
    password: fields.password({ required: validators.required('You definitely want a password') }),
    confirm:  fields.password({
        required: validators.required('don\'t you know your own password?'),
        validators: [validators.matchField('password')]
    }),
    email: fields.email()
});

module.exports = {

    reg_form
}