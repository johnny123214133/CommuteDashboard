from dotenv import load_dotenv
import os
import sys
import pymysql

load_dotenv()

mysql_credentials = {
	'host' : os.environ.get('MYSQL_HOST'),
	'user' : os.environ.get('MYSQL_USER'),
	'password' : os.environ.get('MYSQL_PASSWORD'),
	'database' : os.environ.get('MYSQL_DB')
}

def teardown(command=''): 

	try:
		# drop db if the command is given
		if command == 'drop_db':
			# To connect MySQL database 
			conn = pymysql.connect( 
				host=mysql_credentials['host'], 
				user=mysql_credentials['user'],  
				password=mysql_credentials['password'], 
				# db=mysql_credentials['database'], 
			) 
			
			cur = conn.cursor()

			print('attempting to drop db...')
			statement = f'drop database if exists {mysql_credentials['database']};'
			cur.execute(statement)
			print('dropped db')
			return
		else:
			# To connect MySQL database 
			conn = pymysql.connect( 
				host=mysql_credentials['host'], 
				user=mysql_credentials['user'],  
				password=mysql_credentials['password'], 
				db=mysql_credentials['database'], 
			) 
			
			cur = conn.cursor()
			
			# tear down tables according to sql statements in delete tables directory
			print('dropping tables...')
			create_tables_directory = os.path.join('.', 'delete_tables')
			for _,_,files in os.walk(create_tables_directory):
				for filename in files:
					with open(os.path.join(create_tables_directory, filename), 'r') as f:
						statement = f.read()
						cur.execute(statement)
			print('done dropping tables')

	except Exception as e:
		print('Error:', e)
	finally:
		conn.close() 

if __name__ == "__main__":
	if len(sys.argv) > 1:
		teardown(sys.argv[1])
	else:
		teardown()




