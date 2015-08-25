from random import randrange

'''
simulate random with given probabilities
add weather enhancements to battle
'''

class Spell:
    '''
    int id, hp, mp, bp, power, magic;
    String name;
    '''
    def __init__(self,id):
        self.id = id

class Item:
    '''
    int id, hp, mp, bp, power, magic, adef, mdef, level;
    int price
    String name;
    '''
    def __init__(self,id):
        self.id = id
        self.price = 0

class World:
    '''
  int id;
  String name;
  Player[] npcs;
  Item[] treasures;//weird
  char weather;
  boolean isTown;
    '''
    def __init__(self,id):
        self.id = id
        self.isTown = False # assume not a town
        self.npcs = []
        
    def printInfo(self):
        print id

class Player:
    '''
    int id, hp, mp, bp, power, magic, level, adef, mdef;
    int x, y;
    String name;
    int battles, exp;//total experience and number of battles
    Item[] carry;//items you are holding
    Spell[] spells;
    int money;
    '''
    def __init__(self,id):
        self.id = id
        self.isFriendly = False # assume an enemy
        self.carry = []
    
    def printInfo(self):
        print self.id, self.name, self.power, self.magic, self.adef, self.mdef, self.hp, self.mp , self.bp, self.level
        
def enterTown(world):
    a = -1
    i = 0 
    
    print "Where would you like to go?"
    
    for npc in world.npcs:
        print i,")",npc.name
        i += 1
        
    print i, ") Exit" 
    
    while a < 0 or a > i:
        a = input("")
        
    if a is i:
        pass
    else:
        npc = world.npcs[a]
        print "What would you like?"
        
        a = -1 
        i = 0
        for item in npc.carry:
            print i,")",item.name
            i += 1
            
        print i,") Leave"
        
        while a < 0 or a > i:
            a = input("")
        
        if a is i:
            pass
        else:
            if npc.carry[a].price > pc.money:
                print "not enough money"
            else:
                pc.carry.append(npc.carry[a])
                print pc.name,"received a", npc.carry[a].name+"!"
                del npc.carry[a]
        
    del a
    del i

def enterWild(world):
    # print "You have entered the wild"
    a = 0
    
    while a != 1 or a != 2:
        print "Would you like to\n1) Fight\n2) Leave"
        a = input("")
    
    if a is 2:
        pass
    else:
        print "Prepare for battle!"
        ''' 
        not sure if i want to... 
        d. prototype with assigned probability percentages to allow rare monsters
            instead of a uniform approach. yeah, definitely
        
        for now... creep prototypes and npcs in world.npc[]
        '''
        creep = world.npc[randrange(0,len(world.npcs))] # test code onry
        
        if creep.isFriendly is False:
            while pc.hp > 0 and creep.hp > 0:
                a = 0
                while a < 1 or a > 5:
                    print "What would you like to do?"
                    print "1) Attack\n2) Magic\n3) Item\n4) Run"
                    a = input("")
    
                if a is 1:
                    print "Attacking",creep.name
                    #determine player strength power/magic
                    #determine creep defense a/m/def
                    #calculate final damage
                elif a is 2:
                    print "What spell would you like to use?"
                elif a is 3:
                    print "What item would you like to use?"
                elif a is 4:
                    print "Got away safely"
                    return
                else:
                    print "something went wrong in battle menu"
                
            # someone died
            if pc.hp <= 0:
                print "You have died."
                # have the creep steal random stuff from you
                # to get it back you must kill it again                
            elif creep.hp <= 0:
                print "Victory!!"
                #get items and exp 
            else:
                print "something went wrong exiting battle"
        else:
            print "You have found",creep.name
            # this npc will have specific fields that
            # will take place. Quest or items etc
        
    del a
    
''''''''''''''
''' BEGIN  '''
''''''''''''''

population = 0
itemcount = 0

print 'Welcome to RPG'
name = raw_input("What is your player's name? ")
#create player
pc = Player(population)
pc.name = name
pc.isFriendly = True
population += 1

answer = ""
while answer != "magic" and answer != "power" and answer != "custom":
    print "What type will your character be?"
    answer = raw_input("type magic, power, or custom ")

if answer == "magic":
    pc.hp = 125
    pc.mp = 175
    pc.magic = 2
    pc.power = 0
elif answer == "power":
    pc.hp = 225
    pc.mp = 75
    pc.magic = 0
    pc.power = 2
elif answer == "custom":
    a = 0
    
    while a < 1:
        print "You have 300 points to spend on health and mana"
        print "How much would you like to spend on health?"
        print "The rest will go towards your mana"
        print "You must have atleast 1 health"
        a = input("")
    pc.hp = a
    pc.mp = 300 - a
    
    a = -1
    while a != 1 and a != 2 and a !=3:
        print "You have 2 class points (power/magic)"
        print "Would you like to\n1) Add 2 points to power\n2) Add 2 points to magic\n3) Add 1 point to each"
        a = input("")
    
    if a == 1:
        pc.power = 2
        pc.magic = 0
    elif a == 2:
        pc.magic = 2
        pc.power = 0
    elif a == 3:
        pc.magic = 1
        pc.power = 1
    else:
        print "something went wrong here"
        
    del a
else:
    print "something went wrong here in type switch statement"

del answer

#set values to begin
pc.adef = 5
pc.mdef = 5
pc.x = 0
pc.y = 0
pc.money = 0
# pc.carry = []

# TEST CODE
gridSize = 25
worlds = [[i for i in range(gridSize)] for j in range(gridSize)]

total = 0
for world in worlds:
    for w in world:
        w = World(total)
        total+=1
        
worlds[0][0] = World(0)
worlds[0][0].name = "Home"
worlds[0][0].isTown = True;

test_item = Item(itemcount)
itemcount += 1
test_item.hp = 25
test_item.name = "Potion"
test_item.price = 0

mother = Player(population)
population += 1
mother.name = "Mother"
mother.isFriendly = True
# mother.carry = []
mother.carry.append(test_item)
mother.carry.append(test_item)
# worlds[0][0].npcs = []
worlds[0][0].npcs.append(mother)

worlds[0][1] = World(1) # 1 is arbitrary
creep = Player(population)
population += 1

creep.name = "Bat"
creep.level = 1
# creep.carry = []
creep.carry.append(test_item)
creep.money = 10
creep.hp = 50
creep.mp = 20
creep.bp = 0
creep.power = 1
creep.magic = 1
creep.adef = 0
creep.mdef = 0

# worlds[1][0].npcs = []
worlds[0][1].npcs.append(creep)
worlds[0][1].weather = "dry"
# END TEST CODE


print "You have\n",pc.power,"class points in Power\n",pc.magic,"class points in Magic"
print pc.hp,"HP and ",pc.mp,"MP"
print "================================================================="
print "================================================================="
print "================================================================="
print "======================Entering World============================="
print "================================================================="
print "================================================================="
print "================================================================="
print "Welcome",pc.name,"!"

timeturns = 0
while timeturns >= 0:
    answer = -1
    
    while answer < 0 or answer > 4:
        print "Would you like to go:\n1) North\n2) South\n3) East\n4) West\nfrom your current location?\nOr type 0 to enter your current location"
        print "Your current location is (" + str(pc.x) + ", " + str(pc.y) + ")"
        
        if worlds[pc.x][pc.y].isTown:
            print "The town is called", worlds[pc.x][pc.y].name
        else:
            print "The air here is", worlds[pc.x][pc.y].weather
            
        answer = input("")
    
    if answer == 0:
        if worlds[pc.x][pc.y].isTown:
            print "Welcome to", worlds[pc.x][pc.y].name
            enterTown(worlds[pc.x][pc.y])
        else:
            enterWild(worlds[pc.x][pc.y])
    elif answer == 1:
        pc.y = (pc.y + 1) % gridSize
    elif answer == 2:
        pc.y = (pc.y - 1) % gridSize
    elif answer == 3:
        pc.x = (pc.x + 1) % gridSize
    elif answer == 4:
        pc.x = (pc.x - 1) % gridSize
    else:
        print "something went wrong in navigation"
    



    
    
    
    
    
    
    
    
    

    