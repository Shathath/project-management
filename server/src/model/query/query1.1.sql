
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
	password varchar(1024) not null,
	create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	passwordchangedat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP.
	originalpassword varchar(1024) not null
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
	status int references status(status_id),
	project_id bigint references projects(project_id),
	created_by bigint references users(user_id),
	module_id int references modules(module_id)
	duedate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table status
(
	status_id serial primary key,
	name varchar(100) not null
)

create table modules(
	module_id serial primary key,
	name varchar(100) not null
)

create table projectsusersmap
(
	project_id bigint references projects(project_id),
	user_id int references users(user_id)
)

create table tasksusersmap
(
	task_id int references tasks(task_id),
	user_id int references users(users_id)
)