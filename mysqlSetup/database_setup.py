from dotenv import load_dotenv
import os
import pymysql

load_dotenv()

mysql_credentials = {
	'host' : os.environ.get('MYSQL_HOST'),
	'user' : os.environ.get('MYSQL_USER'),
	'password' : os.environ.get('MYSQL_PASSWORD'),
	'database' : os.environ.get('MYSQL_DB')
}

# print(mysql_credentials)

def setup(): 
	# To connect MySQL database 
	conn = pymysql.connect( 
		host=mysql_credentials['host'], 
		user=mysql_credentials['user'],  
		password=mysql_credentials['password'], 
		# db=mysql_credentials['database'], 
	) 
	
	cur = conn.cursor()

	try:
		print('creating db...')
		statement = f'create database if not exists {mysql_credentials['database']};'
		# print(statement)
		cur.execute(statement)
		statement = f'use {mysql_credentials['database']};'
		cur.execute(statement)
		print('done creating db')
	except Exception as e:
		print('Error:', e)
		conn.close()
		return

	# create tables according to sql statements in create tables directory
	try:
		print('creating tables...')
		create_tables_directory = os.path.join('.', 'create_tables')
		for _,_,files in os.walk(create_tables_directory):
			for filename in files:
				with open(os.path.join(create_tables_directory, filename), 'r') as f:
					statement = f.read()
					cur.execute(statement)
		print('done creating tables')

	except Exception as e :
		print('Error:', e)
	finally:
		conn.close() 

if __name__ == "__main__":
	setup()




