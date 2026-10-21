// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
const params = {};
params.event_name = $ui.event_name.value;
params.start_date = $ui.start_pick.value;
params.end_date = $ui.end_pick.value;
params.all_day = $ui.switch_all_day.value;
params.description = $ui.text_description.value;
params.calendar_id = $ui.select_calendar_id.value;
params.section_id = $ui.select_section.value;

const res = await sql(params);
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
