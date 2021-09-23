interface BaseRecord { id: string }
interface Person extends BaseRecord {
  name: string;
  phone: boolean;
}

interface Database<T extends BaseRecord> {
  set(value: T): void
  get(id: string): T | undefined
}

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {}
  
    set(value: T): void {
      this.db[value.id] = value  
    }
  
    get(id: string): T | undefined {
      return this.db[id]
    }
  }
  return InMemoryDatabase
}

const PersonDatabase = createDatabase<Person>()

const database = new PersonDatabase()
database.set({
  id: '1',
  name: 'bas',
  phone: true
})


const person = database.get('1')
console.log(person)
