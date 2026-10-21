// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
const params = {};
params.id = $ui.display_id.value;
params.id = $ui.id.value;
params.start_date = $ui.start_date.value;
params.end_date = $ui.end_date.value;
params.all_day = $ui.all_day.value;
params.event_name = $ui.event_name.value;
params.description = $ui.description.value;
params.calendar_id = $ui.calendar_id.value;
params.section_id = $ui.section_id.value;
const update = await SQLUpdate(params);
if (update.hasOwnProperty("data") === false) {
   $fn.message({ message: "Error Occured", severity: "error", close: true,position:"top-center" });
   return;
}
const affectedRows = update.data.affectedRows;
if (affectedRows > 0) {
   $fn.message({ message: "Successfully Updated.", severity: "success", close: true, position: "top-center" });
   $fn.nextUI('List_MAIN');
}
else if (affectedRows == 0) {
   $fn.message({ message: "Updation failed.", severity: "error", close: true, position: "top-center" });
}
}
