UPDATE EC.EC_data2 SET  event_name = ${param.event_name} , start_date = ${param.start_date} , end_date = ${param.end_date},all_day = ${param.all_day}, description = ${param.description},
    calendar_id = ${param.calendar_id},section_id = ${param.section_id}
 WHERE  id = ${param.id};
