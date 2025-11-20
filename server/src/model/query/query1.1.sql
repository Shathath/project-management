
create table designation 
(	
	designation_id serial primary key,
	name varchar(265) not null,
	create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE ROLES(
	role_id serial primary key,
	name varchar(100) not null
)

CREATE TABLE teams(
	team_id serial primary key,
	name varchar(100) not null	
);

CREATE TABLE team_members(
	id serial primary key,
	team_id int references teams(team_id),
	user_id int references users(user_id),
);

create table users
(
	id serial primary key,
	name varchar(265) not null,
	email varchar(128) not null,
	designation_id int references designation(designation_id),
	role_id int references roles(role_id),
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	password_changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP.
	password varchar(1024) not null,
	is_deleted boolean DEFAULT false
)

create table PROJECTS
(
	 project_id bigint serial primary key,
	 name varchar(265) not null,
	 created_by int references USERS(user_id),
	 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	 is_deleted boolean DEFAULT false
)

create table TASKS
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

create table STATUS
(
	status_id serial primary key,
	name varchar(100) not null
)

create table MODULES(
	module_id serial primary key,
	name varchar(100) not null
)

CREATE TABLE PROJECTSUSERSMAP
(
	project_id bigint references projects(project_id),
	user_id int references users(user_id)
	primary key (project_id, user_id)
)

create table tasksusersmap
(
	task_id int references tasks(task_id),
	user_id int references users(users_id)
)