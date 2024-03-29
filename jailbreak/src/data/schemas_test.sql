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

create table `event`(
    event_id int primary key auto_increment,
    event_name varchar(100) not null
);

create table game_event(
    game_event_id int primary key auto_increment,
    event_id int not null,
    game_id int not null,
    just_added boolean not null,
    finished boolean not null default false,
    constraint fk_game_event_event_id
        foreign key (event_id)
        references `event`(event_id),
    constraint fk_game_event_game_id
        foreign key (game_id)
        references game(game_id)
    );
    -- call set_known_good_state();
    
use jailbreak_test;
select * from `game`;
select * from `user`;
select * from resources;

    insert into `role`(role_name) values
    ('ADMIN'),
    ('USER');
    
    insert into `user`(username, user_password, role_id) values
    ('admin', '$2a$10$Sz5TSqta44K8xKEnAMHyvulRaIT4/z5c8P3CMo.gfG/X22.1RTV8O', 1),
    ('user', '$2a$10$vmRBGkzIK16Ru71KGR564uaafeZHI8cJXwDWr5qk3X/ncnJ9XTurG', 2);
    
    insert into game (user_id, character_name, game_number) values
    (1, 'admin test', 1),
    (2, 'user test', 1);
    
    insert into resources (resource_name, resource_value, resource_default_inc_rate) values
    ('cheese', 1, 1),
    ('minions', 1, 1),
    ('old rat', 1, 1),
    ('yogies', 2, 1);
    
    insert into inventory_slot(game_id, resource_id, quantity) values
    (1, 1, 2),
    (2, 2, 1);
    
    insert into event(event_name) values
    ("start"),
    ("tutorial"),
    ("unlock_minions"),
    ("minion_gain_1"),
    ("minion_gain_2"),
    ("minion_gain_3"),
    ("minion_gain_4"),
    ("minion_gain_5"),
    ("minion_gain_6"),
    ("minion_gain_7"),
    ("minion_gain_8"),
    ("minion_gain_9"),
    ("minion_gain_final"),
    ("meeting"),
    ("talk_1"),
    ("bribe"),
    ("talk_2"),
    ("enter_room"),
    ("escape")
    ;
    
    insert into game_event(game_id, event_id, just_added) values
    (1, 1, true),
    (2, 1, true),
    (2, 2, true);
    
select * from game_event;
