
async function datacollege(){
    const cstate=['Madhya Pradesh','Maharashtra','Rajasthan','Gujarat','Uttar Pradesh','Punjab','Haryana'];
    const ccity=[['Indore','Gwalior','Bhopal'],['Pune','Mumbai','Nashik'],['Jaipur','Kota','Udaipur'],['Surat','Ahmedabad','Rajkot'],['Prayagraj','Agra','Kanpur'],['Amritsar','Ludhiana','Patiala'],['Gurugram','Panipat','Rohtak']];
    const ccourses=['Computer Science','Electrical Engineering','Mechanical Engineering','Civil Engineering','Information Technology']
    arr=[]
    for(i=1;i<=100;i++){
    
    cname='College'+(i<10?'0'+i:i);
    id='Collegeid'+(i<10?'0'+i:i);
    year=Math.floor(Math.random()*50+1950);
    b=Math.floor(Math.random()*5)+2;
    courses=ccourses.slice(0,b);
    a=Math.floor(Math.random()*7);
    aa=Math.floor(Math.random()*3);
    city=ccity[a][aa];
    state=cstate[a];
    country='India';
    numberStudents=0;
    aob=new college({
        name:cname,id,city,state,country,year,numberStudents,courses
    })
    //arr.push(aob);
    await aob.save()
    .then(a=>console.log('saved '+i+'\n'))
    .catch(a=>console.log('error '+i+a+'\n'));
    console.log(a+" "+aa+" "+city+'\n');
    }
    
    college.find({})
    .sort('name')
    .then(a=>{
        a.map(item=>{
            console.log(item.name+'\n');
        })
    })
    
    
    }

async function datastudent(){
    sskills=['C','C++','JAVA','JAVASCRIPT','PHP','SCALA','HADOOP','PYTHON','SQL','CSS','HTML'];
    for(i=1;i<=100;i++){
        cname='College'+(i<10?'0'+i:i);
        await college.findOne({name:cname})
        .then(async function(data){
            n=data.courses.length;
            courses=data.courses;
            studentsum=0;
            arr=[];
            for(j=0;j<n;j++){
                nstu=Math.floor(Math.random()*10+50);
                studentsum+=nstu;
                for(k=0;k<nstu;k++){
                    name='Student'+k+'c'+i+j;
                    year=Math.floor(Math.random()*4)+2020;
                    id='Stu'+k+'clg'+i+'br'+j;
                    branch=courses[j];
                    collegeid=data._id;
                    a=Math.floor(Math.random()*10);
                    b=Math.min(a+3,10);
                    skills=sskills.slice(a,b);

                     s=new student({
                        name,id,branch,year,collegeid,skills
                    })
                    arr.push(s);

                }
            }
            await student.insertMany(arr)
            .then(a=>console.log('saved'))
            .catch(a=>console.log("error "+a+'\n'));

            data.numberStudents=studentsum;
           await data.save()
            .then(a=>console.log("data saved "+i+'\n'))
            .catch(a=>console.log('error'+a+'\n'))

        })



    }
    
}