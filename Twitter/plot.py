import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib import style
import time

style.use("ggplot")

fig = plt.figure()
ax1 = fig.add_subplot(1,1,1)

def animate(i):
	pullData = open("COVID19.txt", "r").read()
	lines = pullData.split('\n')

	xarray = []
	yarray = []

	x = 0
	y = 0

	for l in lines[-200:-1]:
		x += 1
		if l != ' ':
			a = float(l)
			print(a)
			if  a>0.0:
				y += a
			elif a<0.0:
				y -= abs(a)
			xarray.append(x)
			yarray.append(y)
			

	ax1.clear()
	ax1.plot(xarray,yarray)
ani = animation.FuncAnimation(fig, animate, interval=1000,save_count=1000)
plt.show()