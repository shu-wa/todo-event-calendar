// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
const params = {};
params.id = $ui.display_id.value;
params.todo_name = $ui.todo_name.value;
params.todo_date = $ui.todo_date.value;
params.check_box = $ui.check_box.value;
const update = await SQLUpdate(params);
if (update.hasOwnProperty("data") === false) {
   $fn.message({ message: "Error Occured", severity: "error", close: true,position:"top-center" });
   return;
}
const affectedRows = update.data.affectedRows;
if (affectedRows > 0) {
   $fn.message({ message: "Successfully Updated.", severity: "success", close: true, position: "top-center" });
   $fn.nextUI('MOBILE_CARENDER');
}
else if (affectedRows == 0) {
   $fn.message({ message: "Updation failed.", severity: "error", close: true, position: "top-center" });
}
}
