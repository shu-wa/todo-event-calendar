// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
$ui.display_id.value = $param["key"];
console.log($ui.display_id.value);
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
  $ui.event_name.value = res.data[0].event_name;
  $ui.start_pick.value = res.data[0].start_date;
  $ui.end_pick.value = res.data[0].end_date;
  $ui.switch_all_day.value = res.data[0].all_day;
  $ui.select_calendar_id.value = res.data[0].calendar_id;
  $ui.select_section.value = res.data[0].section_id;
  $ui.text_description.value = res.data[0].description;

}
}
