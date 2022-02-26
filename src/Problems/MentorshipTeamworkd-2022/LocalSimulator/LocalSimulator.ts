export class LocalSimulator {
    constructor() { }

    public getScore(output: string, project_dates: any) {
        let file = output.split('\n').map(line => line.split(' '));
        let final_score = 0;
        file.slice(1).forEach((line, index) => {
            if (index % 2 == 0) {
                const project = line[0];
                const project_obj = project_dates[project];
                if (!!project_obj) {
                    const { end_date, best_before, score } = project_obj;
                    if ((best_before - end_date) > 0) {
                        final_score += score
                    } else {
                        let late_duration = end_date + 1 - best_before
                        if (late_duration < 0) {
                            late_duration = 0;
                        }
                        final_score += ((score - late_duration) < 0) ? 0 : (score - late_duration);
                    }
                }
            }
        })
        return final_score;
    }
}
