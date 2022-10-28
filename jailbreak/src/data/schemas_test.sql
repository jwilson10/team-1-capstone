drop database if exists jailbreak_test;
create database jailbreak_test;
use jailbreak_test;

create table role (
	role_id int primary key auto_increment,
    role_name  varchar(100) not null
);

create table `user` (
	user_id int primary key auto_increment,
	username varchar(100) not null,
	user_password varchar(100) not null,
	role_id int not null,
		constraint uq_user_username
        unique(username),
		constraint fk_user_role_id
		foreign key (role_id)
        references role(role_id)
    );
    


create table game(
game_id int primary key auto_increment,
user_id int not null ,
character_name varchar(100) not null,
game_number int not null,
	constraint game_user_id
    foreign key (user_id)
    references `user`(user_id)
);

create table resources(
resource_id int primary key auto_increment,
resource_name varchar(100) not null ,
resource_value int not null,
resource_default_inc_rate int not null,
	constraint resources_resource_name
    unique(resource_name)
);

create table inventory_slot(
slot_id int primary key auto_increment,
game_id int not null,
resource_id int not null,
quantity int not null,
	constraint inventory_slot_resource_id
    foreign key (resource_id)
    references resources(resource_id),
	constraint invetory_slot_game_id
    foreign key (game_id)
    references game(game_id)
);
    -- call set_known_good_state();
    
use jailbreak_test;
select * from `game`;
select * from `user`;
