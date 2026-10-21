// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
const params = {};
params.todo_name = $ui.todo_name.value;
if (!$ui.todo_date.value) {
    params.todo_date = null;
}
else {
    params.todo_date = $ui.todo_date.value;
}
params.check_box = $ui.check_box.value;
const res = await SQLSave(params);
if (res.hasOwnProperty("data") === false) {
    $fn.message({ message: "Error Occured", severity: "error", close: true, position: "top-center" });
    return;
}
const affectedRowsInsert = res.data.affectedRows;
if (affectedRowsInsert > 0) {
    $fn.message({ message: "Successfully Inserted.", severity: "success", close: true, position: "top-center" });
    $fn.nextUI('MOBILE_CARENDER');
}
else {
    $fn.message({ message: "Insertion failed.", severity: "error", close: true, position: "top-center" });
}
}
