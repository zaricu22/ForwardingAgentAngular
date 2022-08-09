# ForwardingAgentAngular

A system provide a platform for associating the manufacturers with the corresponding carriers (shippers) as part of a logistics chain. 
It should be seen as an advertisement platform which provide the review of supply and demand of each company.
Its purpose is not to conclude the agreements between the two sides but to bring them closer. 
It is a web-oriented application system with an Angular front-end interface which 
access to a services and MySQL database are offered through a Spring back-end module.
The simple preview of the web application user interface and its features can be seen in the <a href="./Images">'Images'</a> folder.

The primary users of the system are the companies where a certain information can be made available to the their employees. 
The user interface of the Angular web app is based on a Bootstrap and a PrimeNG dependencies. 
The Front-end unit contains a four components (register and login page, landing page, manufacturer's page, or carrier's page).  

Each carrier registered on the platform has own reputation evaluation examined from its shipments history. 
The manufacturer can search over a truck and trailer base to find a vehicle with a certain characteristics and its
carrier contact information and reputation. 
On the other hand, the carrier should be able to review a cargos from each manufacturer that wait on a shipping process. 
Both company types may use a corresponding delivery records from the database which offers data about a cargo type, payment or completion status, and other details about particular delivery. 

The platform supply the manageable base of drivers and vehicles to the each registered carrier company. 
The individual driver may have a record of the assigned vehicles. 
It also provide the information about a vehicle age status and a driver experience.
Each driver has its own delivery history as a major parameters of its work. 

