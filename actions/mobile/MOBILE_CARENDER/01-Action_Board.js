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
        if (obj.start_date) {
            const startDate = new Date(obj.start_date);
            obj.start_date = new Date(startDate.getTime() + (9 * 60 * 60 * 1000)).toISOString().replace('T', ' ').substring(0, 19);
        }
        if (obj.end_date) {
            const endDate = new Date(obj.end_date);
            obj.end_date = new Date(endDate.getTime() + (9 * 60 * 60 * 1000)).toISOString().replace('T', ' ').substring(0, 19);
        }
    });
    $ui.MAIN_TABLE.value = res.data;
}


const params = {};
params.name = $param.searchValue || '';


const resTODO = await sqlTODO(params);

if (resTODO.hasOwnProperty('data') === false) {
    $fn.message({ message: "Error Occured", severity: "error", close: true });
    return;
}
const affetcedRowsTODO = resTODO.data.length;
if (affetcedRowsTODO > 0) {
    resTODO.data.forEach(obj => {
        obj['SELECT_ITEM'] = 'SELECT';
    });
    $ui.data_list.value = resTODO.data;
}
}
