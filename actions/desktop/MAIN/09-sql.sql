UPDATE EC.EC_data2 SET
id = ${param.event_id} ,
start_date = ${param.start_date} ,
end_date = ${param.end_date} ,
all_day = ${param.all_day} ,
event_name = ${param.event_name} ,
description = ${param.description} ,
calendar_id = ${param.calendar_id} ,
section_id = ${param.section_id}
WHERE event_id = ${param.event_id};
