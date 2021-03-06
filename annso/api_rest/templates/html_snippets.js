
var toolbar_selection_label = "<i class=\"fa fa-check-square-o\" aria-hidden=\"true\"></i> Selection{0}";


var sample_selection_table_header    = "<table id=\"browser_samples_table\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\" style=\"margin:0;\"><thead><tr><th style=\"width:30px;\"></th><th>Sample</th>{0}</tr></thead><tbody></tbody></table>";
var sample_selection_table_row       = "<tr id=\"browser_samples_table_{0}\"><td><button class=\"fa delete\" onclick=\"javascript:ui.remove_sample(this);\"> </button></td><td><input type=\"text\" placeholder=\"{1}\" value=\"{2}\" onchange=\"javascript:ui.update_sample_nickname({0}, this);\"/></td>{3}</tr>";
var sample_selection_table_attribute = "<{0}><input type=\"text\" placeholder=\"{1}\" value=\"{2}\" onchange=\"javascript:ui.validate_attribute(this);\"/></{0}>";



var analysis_title_template = "<i class=\"fa fa-folder-o\" style=\"width:20px; text-align:center; margin-right:20px;\" aria-hidden=\"true\"></i>{0}";




var fields_selection_template = "<h3><a data-toggle=\"collapse\" href=\"#collapse_{0}\">{0}</a> {1}</h3><div id=\"collapse_{0}\" class=\"panel-collapse collapse\"><p style=\"font-style:italic; color:#999; margin-top:-10px;\">{2}</p><table>{3}</table></div>";
var fields_selection_row_template = "<tr><td style=\"width:20px; vertical-align:top;\"><input type=\"checkbox\" id=\"annotation_fields_field_{0}\" onchange=\"javascript:filter_toggle_field(this, '{0}');\"/></td><td style=\"width:250px; vertical-align:top;\">{1}</td><td style=\"font-style:italic; color:#999;\">{2}</td></tr>";
var fields_selection_db_version_template = "<span style=\"font-size:12px;\">(<select style=\"background:none; border: none;\">>{0}</select>)</span>";
var fields_selection_db_version_option_template = "<option value=\"{0}\"{2}>{1}</option>";







// filter_condition_template.format('check', 'DP > 400');
var filter_condition_template = "<li class=\"condition {0}\">\
    <button onclick=\"javascript:filter_toggle_condition(this);\">\
        <i class=\"fa\" aria-hidden=\"true\">&nbsp;</i>\
        <span>{1}</span>\
    </button>\
    <button class=\"fa delete\" onclick=\"javascript:ui.remove_afilter_condition(this);\">&nbsp;</button>\
    <button class=\"fa edit\" onclick=\"javascript:ui.edit_afilter_condition(this);\">&nbsp;</button>\
    <input type=\"hidden\" value='{2}' />\
</li>";


var filter_set_template = "<li class=\"condition {0}\">\
    <button onclick=\"javascript:filter_toggle_condition(this);\">\
        <i class=\"fa\" aria-hidden=\"true\">&nbsp;</i>\
        <span>{1} {2}</span>\
    </button>\
    <button class=\"fa delete\" onclick=\"javascript:ui.remove_afilter_condition(this);\">&nbsp;</button>\
    <button class=\"fa edit\" onclick=\"javascript:ui.edit_afilter_condition(this);\">&nbsp;</button>\
    <input type=\"hidden\" value='{3}' />\
</li>";


// filter_group_template.format('check', 'or', '', 'checked', '', '...');
var filter_group_template = "<li class=\"condition {0}\">\
    <button onclick=\"javascript:filter_toggle_condition(this);\">\
        <i class=\"fa\" aria-hidden=\"true\">&nbsp;</i> \
    </button>\
    <button class=\"fa delete\" onclick=\"javascript:ui.remove_afilter_condition(this);\">&nbsp;</button>\
    <button class=\"fa toggle minus\" onclick=\"javascript:ui.toggle_afilter_condition(this);\">&nbsp;</button>\
    <select name=\"select\" class=\"{1}\" onmouseup=\"javascript:filter_switch_operator(this);\">\
        <option value=\"AND\" {2}>AND</option> \
        <option value=\"OR\" {3}>OR</option>\
        <option value=\"XOR\" {4}>XOR</option>\
    </select>\
    <ul class=\"{1}\">\
        {5}\
        <li class=\"addcondition\">\
            <button href=\"#modal_filter_add_condition\" data-toggle=\"modal\" onclick=\"add_filter_ui_parent_elmt=$(this).parent();update_filter_set_map();\">\
                <b class=\"fa fa-plus\" aria-hidden=\"true\">&nbsp;</b>\
                <span>Add new condition</span>\
            </button>\
        </li>\
    </ul>\
</li>";

var filter_save_filter_empty = "<li class=\"empty_selection\">No filter saved</li>";
var filter_save_filter_row   = "<li><a href=\"javascript:ui.reset_filter({0});\"><i class=\"fa fa-cube\" aria-hidden=\"true\" style=\"width:20px; text-align:center;\">&nbsp;</i>{1}</a></li>";


var variants_table_header_start = "<table id=\"variants_list_table\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\" style=\"margin:0\">\
    <thead><tr><th style=\"width:20px\"><input id=\"checkbox_all_variants\" type=\"checkbox\" onchange=\"javascript:ui.check_all_variant();\"/></th>";
var variants_table_header_cell  = "<th onclick=\"javascript:ui.order_by('{0}');\" style=\"cursor:pointer;\">{1} <span id=\"orderby_{0}\">{2}</span></th>";
var variants_table_header_end   = "</tr></thead><tbody>";

var variants_table_row_start = "<tr id=\"variant_{0}\"><td><input type=\"checkbox\" value=\"{0}\" onchange=\"javascript:ui.check_variant(this);\"{1}/></td>";
var variants_table_row_cell  = "<td>{0}</td>";
var variants_table_row_end   = "</tr>";




var filter_form_operators_type_int = "<select name=\"select\" id=\"modal_filter_field_operator\">\
                                    <option value=\"==\">=</option> \
                                    <option value=\"!=\">&#8800;</option>\
                                    <option value=\"<\">&lt;</option>\
                                    <option value=\"<=\">&#8804;</option>\
                                    <option value=\">=\">&#8805;</option>\
                                    <option value=\">\">&gt;</option></select>\
                                <input type=\"text\" id=\"modal_filter_field_value\" placeholder=\"Field value\" value=\"{0}\"/>"

var filter_form_operators_type_float = "<select name=\"select\" id=\"modal_filter_field_operator\">\
                                    <option value=\"==\">=</option> \
                                    <option value=\"!=\">&#8800;</option>\
                                    <option value=\"<\">&lt;</option>\
                                    <option value=\"<=\">&#8804;</option>\
                                    <option value=\">=\">&#8805;</option>\
                                    <option value=\">\">&gt;</option></select>\
                                <input type=\"text\" id=\"modal_filter_field_value\" placeholder=\"Field value\" value=\"{0}\"/>"

var filter_form_operators_type_string = "<select name=\"select\" id=\"modal_filter_field_operator\">\
                                    <option value=\"==\">=</option> \
                                    <option value=\"~\">~</option>\
                                    <option value=\"!=\">&#8800;</option> \
                                    <option value=\"!~\">&#8769;</option></select>\
                                <input type=\"text\" id=\"modal_filter_field_value\" placeholder=\"Field value\" value=\"{0}\"/>"

var filter_form_operators_type_percent = "<select name=\"select\" id=\"modal_filter_field_operator\">\
                                    <option value=\"==\">=</option> \
                                    <option value=\"!=\">&#8800;</option>\
                                    <option value=\"<\">&lt;</option>\
                                    <option value=\"<=\">&#8804;</option>\
                                    <option value=\">=\">&#8805;</option>\
                                    <option value=\">\">&gt;</option></select>\
                                <input type=\"text\" id=\"modal_filter_field_value\" placeholder=\"Field value\" value=\"{0}\"/>"

var filter_form_operators_type_enum = "<select name=\"select\" id=\"modal_filter_field_operator\">\
                                    <option value=\"==\">=</option> \
                                    <option value=\"!=\">&#8800;</option></select>\
                                    <select name=\"select\" id=\"modal_filter_field_value\">\
                                    {0} </select>"
var filter_form_operators_type_enum_option = "<option value=\"{0}\">{1}</option>"


var filter_form_operators_type_bool = "is <input type=\"checkbox\" id=\"modal_filter_field_value\"{0}/>"