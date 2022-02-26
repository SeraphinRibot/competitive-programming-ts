import { LocalSimulator } from "./LocalSimulator"
import * as fs from "fs";

const localSimulator = new LocalSimulator();
const output = fs.readFileSync('./example-simulator.txt', 'utf-8');

const projects: any = {
    "WebServer": {
        "start_date": 0,
        "end_date": 6,
        "best_before": 7,
        "days": 7,
        "score": 10,
    },
    "Logging": {
        "start_date": 7,
        "end_date": 11,
        "best_before": 5,
        "days": 5,
        "score": 10,
    },
    "WebChat": {
        "start_date": 7,
        "end_date": 16,
        "best_before": 20,
        "days": 10,
        "score": 20
    }
}

console.log(localSimulator.getScore(output, projects));