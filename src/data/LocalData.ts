export class LocalData {
  private getStorageNameForDate(date: string): string {
    return `${date}-liked`;
  }

  public getIsLiked(date: string): boolean {
    return localStorage.getItem(this.getStorageNameForDate(date)) === "true";
  }

  public setIsLiked(date: string, isLiked: boolean): void {
    localStorage.setItem(
      this.getStorageNameForDate(date),
      isLiked ? "true" : "false"
    );
  }
}

export default LocalData;
