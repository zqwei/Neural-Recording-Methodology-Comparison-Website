$('#submit_data').on('click', function(event){
    event.preventDefault();
    $('#datasetSubmit').form('validate form');
    event.preventDefault();
});

// obtain form values
function getFieldValue(fieldId) {
   // 'get field' is part of Semantics form behavior API
   return $('#datasetSubmit').form('get field', fieldId).val();
}

function getFormData(){
  var formData = {
            firstname: getFieldValue('first-name'),
            lastname: getFieldValue('last-name'),
            institution: getFieldValue('Institution'),
            email: getFieldValue('email'),
            data_type: getFieldValue('data_type'),
            repo: getFieldValue('repo'),
            ref: getFieldValue('reference'),
            info : getFieldValue('info')
        };
  return formData;
}

// form validation
$('#datasetSubmit').
  form({
      on: 'blur',
      fields:{
        firstname: {
          identifier : 'first-name',
          rules:[{type : 'empty'}]
        },
        lastname: {
          identifier : 'last-name',
          rules:[{type : 'empty'}]
        },
        repo: {
          identifier : 'repo',
          rules:[{type : 'empty'}]
        },
        email: {
          identifier : 'email',
          rules:[{type : 'email'}]
        }
      },
      onSuccess: function(event, fields){
          submitForm(event);
          event.preventDefault();
        },
      onFailure: function(formErrors, fields){
          formErrors.preventDefault();
        }
    });

// submit form
function submitForm(event){
  event.preventDefault();
  var formData = getFormData();
  $.ajax({ type: 'POST', url: '/data/adddata', data: formData, dataType: 'JSON', success: onFormSubmitted });
}

function onFormSubmitted(res) {
  alert('Thanks to submit your dataset! We have added it in our database and also open an git issue at https://github.com/zqwei/Im-phys-API/issues.')
}
