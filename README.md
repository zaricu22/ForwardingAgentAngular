# ForwardingAgentAngular

A system provide platform for associating manufacturers with corresponding carriers (shippers) as part of logistics chain. 
It should be seen as advertisement platform which provide review of supply and demand of each company,
its purpose is not to conclude agreements between two sides but to bring the two sides closer. 
It is web-oriented application system with Angular front-end interface which 
access to services and MySQL database has offered through Spring back-end module.  
Simple preview of web application user interface and features can be seen in <a href="./Images">'Images'</a> folder.

Primary users of the system are companies where a certain information can be made available to their employees. 
The user interface of Angular web app is based on Bootstrap and PrimeNG dependencies. 
Front-end unit contains four components (register and login page, landing page, manufacturer's page, or carrier's page).  

Each carrier registered on the platform has own reputation examined from its shipments history. 
The manufacturer can search over the truck and trailer base to find the vehicle with certain characteristics and its
carrier contact information and reputation. 
On the other hand, the carrier should be able to review a cargos from each manufacturer that wait on the shipping process. 
Both company types may use corresponding delivery records from database which offers data about cargo type, payment or completion status, and other details about particular delivery. 

The platform supply manageable base of a drivers and vehicles to each registered carrier company. 
A individual driver may have record of assigned vehicles. 
It also provide information about vehicle age status and driver experience.
Each driver has its own delivery history as major parameters of its work. 

