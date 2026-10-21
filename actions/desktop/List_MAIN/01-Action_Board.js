// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
const res = await sql();
if (res.hasOwnProperty('data') === false) {
    $fn.message({ message: "Error Occured", severity: "error", close: true });
    return;
}
const affetcedRows = JSON.stringify(res.data.length);
if (affetcedRows > 0) {
    res.data.forEach(obj => {
        obj['SELECT_ITEM'] = 'SELECT';
    });
    $ui.data_list.value = res.data;
}
}
