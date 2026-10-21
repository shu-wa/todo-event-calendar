SELECT LPAD(ID, 8, "0") AS ID ,todo_name,todo_date,check_box FROM  EC.todo WHERE CASE
        WHEN ${param.name} IS NULL OR ${param.name} = '' THEN 1=1
        ELSE todo_name LIKE CONCAT(${param.name}, '%')
    END ORDER BY todo_date;
