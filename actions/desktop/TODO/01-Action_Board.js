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
const affectedRows = res.data.length;
if (affectedRows > 0) {
  $ui.todo_name.value = res.data[0].todo_name;
  $ui.todo_date.value = res.data[0].todo_date;
  $ui.check_box.value = res.data[0].check_box;
}
}
