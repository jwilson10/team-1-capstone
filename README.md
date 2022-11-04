# Jailbreak

## How to run:
### MySql (/jailbreak/src/data)

Use schemas_test.sql for the DDL and DML. Set set_known_good_state.sql as a stored procedure.

### Jailbreak server (/jailbreak)

Uses Spring Boot. Should not require any changes to run on your machine outside of setting run configuration for the application properties.

### Jailbreak client(/client/jailbreak)

Uses React. Use npm start in the /client/jailbreak folder to run local server. Should not require any changes to run.
