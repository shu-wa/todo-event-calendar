// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
const res = await SQLDelete();
if (res.hasOwnProperty("data") === false) {
    $fn.message({ message: "Error Occured", severity: "error", close: true, position: "top-center" });
    return;
}
const affectedRows = res.data.affectedRows;
if (affectedRows > 0) {
    $fn.message({ message: "Successfully deleted.", severity: "success", close: true, position: "top-center" });
    $fn.nextUI('MAIN');
}
else {
    $fn.message({ message: "Deletion Failed.", severity: "error", close: true, position: "top-center" });
}
$fn.nextUI('MAIN');
}
