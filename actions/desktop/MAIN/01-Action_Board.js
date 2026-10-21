// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
$ui.save_generated.visibility = true;
$ui.delete_generated.visibility = false;
$ui.update_generated.visibility = false;
$ui.back_generated.visibility = false;
if ($param['delete_generated_visibility'] == true && $param['update_generated_visibility'] == true && $param['back_generated_visibility'] == true && $param['save_generated_visibility'] == false) {
  $ui.display_id.value = $param["key"];
  $ui.delete_generated.visibility = true;
  $ui.update_generated.visibility = true;
  $ui.back_generated.visibility = true;
  $ui.save_generated.visibility = false;
}
else {
  $ui.delete_generated.visibility = false;
  $ui.update_generated.visibility = false;
  $ui.back_generated.visibility = false;
  $ui.save_generated.visibility = true;
}
const params = {};
params.id = $param["key"];
const res = await sql(params);
if (res.hasOwnProperty("data") === false) {
  if (res.errorMessage) {
    $fn.message({ message: res.errorMessage, severity: "error", close: true, position: "top-center" });
  } else {
    $fn.message({ message: "Error Occured", severity: "error", close: true, position: "top-center" });
  }
  return;
}
const affectedRows = JSON.stringify(res.data.length);
if (affectedRows > 0) {
  $ui.id.value = res.data[0].id;
  $ui.start_date.value = res.data[0].start_date;
  $ui.end_date.value = res.data[0].end_date;
  $ui.all_day.value = res.data[0].all_day;
  $ui.event_name.value = res.data[0].event_name;
  $ui.description.value = res.data[0].description;
  $ui.calendar_id.value = res.data[0].calendar_id;
  $ui.section_id.value = res.data[0].section_id;
}

const todoparams = {};
todoparams.name = $param.searchValue || '';

const resTODO = await sqlTODO(todoparams);
if (resTODO.hasOwnProperty('data') === false) {
    $fn.message({ message: "Error Occured", severity: "error", close: true });
    return;
}
const affetcedRows = JSON.stringify(resTODO.data.length);
if (affetcedRows > 0) {
    resTODO.data.forEach(obj => {
        obj['SELECT_ITEM'] = 'SELECT';
    });
    $ui.data_list.value = resTODO.data;
}
}
