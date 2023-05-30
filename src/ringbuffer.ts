class RingBuffer<T> {
    readonly capacity: number;
    private buffer: Array<T>;
    private readptr: number = 0;
    private writeptr: number = 0;
    private count: number = 0;
    private allowOverflow: boolean;

    constructor(capacity: number, allowOverflow = true) {
        this.capacity = capacity;
        this.buffer = new Array();
        this.allowOverflow = allowOverflow;
    }

    put(elem: T): boolean {
        if (this.count === this.capacity) {
            if (this.allowOverflow) {
                // bump pointers if overflow allowed
                this.readptr = (this.readptr + 1) % this.capacity;
                this.count--;    
            } else {
                return false;
            }
        }
        this.buffer[this.writeptr] = elem;
        this.writeptr = (this.writeptr + 1) % this.capacity;
        this.count++;
        return true;
    }

    get(): T {
        if (this.count === 0) return undefined;

        const v = this.buffer[this.readptr];
        this.readptr = (this.readptr + 1) % this.capacity;
        this.count--;
        return v;
    }

    get size() {
        return this.count;
    }
}

export default RingBuffer;