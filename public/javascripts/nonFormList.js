var comparisonList = ['selectivity', 'peakness', 'pca', 'decodability'];
var numPerformance = 4;
var html = '';
var objectArrary = $('#nonFormList').serializeArray();
var modelList = [];
var dataList = [];
var dataModelList = [];
var ephysList = [];
var fails = 0;

$.each(objectArrary, function(ind, value){
  var name = this.name.split("/");
  var type_name = name[0];
  if(type_name === 'data'){
    if(name[1].indexOf('ephys')>=0){
      ephysList.push([name[1], name[2]])
    }
    else{
      dataList.push(['imaging '+name[1], name[2]]);
    }
  }
  else if (type_name === 'model') {
    modelList.push(name[1]);
  }
});
if(dataList.length+ephysList.length){
  if(dataList.length === 0 && modelList.length>0){
    alert('No imaging data is selected, s2c or c2s model will not display.');
  }
  if(dataList.length){
    $.each(modelList, function(ind, model){
      $.each(dataList, function(ind, data){
        dataModelList.push([data[0]+'/'+model, data[1]+'_'+model]);
      });
    });
  }
  dataList = ephysList.concat(dataList);
  dataList.sort();
  dataList = dataList.concat(dataModelList);
  $.each(dataList, function(ind, data){
    var str_data = data[0].split("/");
    var tb_name = '';
    if (str_data.length===1){
      tb_name += '<h4>'+str_data[0]+'</h4>';
      tb_name += '<br><br>';
    }else {
      if(str_data[1].indexOf('S2C')>=0){
        tb_name += '<h4> synthetic '+str_data[0]+'</h4>';
      }else{
        tb_name += '<h4> synthetic ephys from '+str_data[0].substring(8)+'</h4>';
      }
      tb_name += str_data[1]+'<br><br>';
    }
    html += '<tr>';
    html += '<td>'+ tb_name +'</td>'
    // html += '<td>' + cellNum + '</td>'
    for(var i=0; i<numPerformance; i++){
      var url =  '/results/nonData/' + data[1] + '_' + comparisonList[i] + '.svg';
      html += '<td><img src="' + url +'"></td>'
    }
    html += '</tr>';
  });
  $('#nonFormListResults').html(html);
}
else{
  alert('No item is selected to display.');
  $('#nonFormListResults').load('/results/_non_ephys_ca_s2c_form_empty.html');
}
