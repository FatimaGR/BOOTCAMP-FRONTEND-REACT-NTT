import { renderHook, act } from "@testing-library/react";
import { useModal } from "../useModal";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("useModal", () => {
  it("should initialize with isModalVisible as false", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isModalVisible).toBe(false);
  });

  it("should set isModalVisible to true when openModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalVisible).toBe(true);
  });

  it("should set isModalVisible to false when closeModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });

    expect(result.current.isModalVisible).toBe(false);
  });

  it("should toggle isModalVisible when closeModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.handleModal();
    });

    expect(result.current.isModalVisible).toBe(true);

    act(() => {
      result.current.handleModal();
    });

    expect(result.current.isModalVisible).toBe(false);
  });
})