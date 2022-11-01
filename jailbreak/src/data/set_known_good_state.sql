CREATE DEFINER=`root`@`%` PROCEDURE `set_known_good_state`()
BEGIN
	delete from game_event;
    alter table game_event auto_increment = 1;
    delete from event;
    alter table event auto_increment = 1;
	delete from inventory_slot;
    alter table inventory_slot auto_increment = 1;
    delete from resources;
    alter table resources auto_increment = 1;
	delete from game;
    alter table game auto_increment = 1;
	delete from `user`;
    alter table `user` auto_increment = 1;
    delete from `role`;
    alter table `role` auto_increment = 1;
    
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
    ('yogies', 2, 1),
    ('minions', 3, 1);
    
    insert into inventory_slot(game_id, resource_id, quantity) values
    (1, 1, 2),
    (2, 2, 1);
    
    insert into event(event_name) values
    ("tutorial"),
    ("distraction");
    
    insert into game_event(game_id, event_id, just_added) values
    (1, 1, true),
    (2, 1, true),
    (2, 2, true);
END