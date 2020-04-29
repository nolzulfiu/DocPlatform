import os
import threading

# Define a function for the thread
def print_time( threadName):
    if threadName == 'back':
        os.system("cd backend & npm install")
    elif threadName == 'front':
        os.system("cd frontend & npm install")
    elif threadName == 'npm':
        os.system("npm i @ckeditor/ckeditor5-build-classic @ckeditor/ckeditor5-react axios bootstrap formik mobx mobx-react react-bootstrap react-router-dom yup moment")


# Create two threads as follows
if __name__ == "__main__": 
    t1 = threading.Thread(target=print_time, args=('back',)) 
    t2 = threading.Thread(target=print_time, args=('front',)) 
    t3 = threading.Thread(target=print_time, args=('npm',))

    t1.start() 
    
    t2.start() 

    t3.start()
  
    # wait until thread 1 is completely executed 
    t1.join() 
    # wait until thread 2 is completely executed 
    t2.join() 

    t3.join()
  
    # both threads completely executed 
    print("Done!") 