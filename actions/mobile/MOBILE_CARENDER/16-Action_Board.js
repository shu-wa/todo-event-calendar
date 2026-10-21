// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
$param['key'] = $ui.data_list.selected.ID;
$param['delete_generated_visibility'] = true;
$param['back_generated_visibility'] = true;
$param['update_generated_visibility'] = true;
$param['save_generated_visibility'] = false;
$fn.nextUI('TODO');
}
