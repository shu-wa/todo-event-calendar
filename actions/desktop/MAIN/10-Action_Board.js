// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
const selectedEvent = $ui.EC_MAIN.selected;

const params = {};
params.event_id = selectedEvent.id;
params.start_date = selectedEvent.start_date;
params.end_date = selectedEvent.end_date;
params.all_day = selectedEvent.all_day;
params.event_name = selectedEvent.event_name;
params.description = selectedEvent.description;
params.calendar_id = selectedEvent.calendar_id;
params.section_id = selectedEvent.section_id;
const res = await sql(params);
if (res.hasOwnProperty("data") === false) {
    $fn.message({ message: "Error Occured", severity: "error", close: true, position: "top-center" });
    return;
}
const affectedRowsInsert = res.data.affectedRows;
if (affectedRowsInsert > 0) {
    $fn.message({ message: "Successfully Inserted.", severity: "success", close: true, position: "top-center" });
}
else {
    $fn.message({ message: "Insertion failed.", severity: "error", close: true, position: "top-center" });
}
}
