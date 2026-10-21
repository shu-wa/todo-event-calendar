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
const res = await SQLDelete(params);
if (res.hasOwnProperty("data") === false) {
    $fn.message({ message: "Error Occured", severity: "error", close: true, position: "top-center" });
    return;
}
const affectedRows = res.data.affectedRows;
if (affectedRows > 0) {
    $fn.message({ message: "Successfully deleted.", severity: "success", close: true, position: "top-center" });
    $fn.nextUI('List_MAIN');
}
else {
    $fn.message({ message: "Deletion Failed.", severity: "error", close: true, position: "top-center" });
}
}
