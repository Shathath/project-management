
create table designation 
(	
	designation_id serial primary key,
	name varchar(265) not null,
	create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table users
(
	user_id serial primary key,
	user_name varchar(265) not null,
	email varchar(128) not null,
	designation_id int references designation(designation_id),
	create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table projects
(
	 project_id bigint serial primary key,
	 name varchar(265) not null,
	 created_by int references users(users_id),
	 create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table tasks
(
	task_id serial primary key,
	task_name varchar(265) not null,
	description varchar(2064) not null,
	priority varchar(24) not null,
	assigned_to varchar(2064) null,
	status varchar(100) not null,
	project_id bigint references projects(project_id),
	created_by bigint references users(user_id)
	duedate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table status
(
	status_id serial primary key,
	name varchar(100) not null
)


create table projectsusersmap
(
	project_id bigint references projects(project_id),
	user_id int references users(user_id)
)