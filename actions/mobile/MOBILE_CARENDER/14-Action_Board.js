// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
// データグリッドのチェックボックスカラムのonchangeイベントに設定
const clickedRow = $ui.data_list.selected;

if (clickedRow && clickedRow.ID) {
    const rowIndex = $ui.data_list.value.findIndex(row => row.ID === clickedRow.ID);

    if (rowIndex !== -1) {
        // boolean型で値を反転
        const currentValue = $ui.data_list.value[rowIndex].check_box;
        const newValue = currentValue;



        const params = {};
        params.id = clickedRow.ID;
        params.check_box = newValue;
        const update = await sql(params);
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
}
}
